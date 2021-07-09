import { Field, ObjectType, InputType } from 'type-graphql';
import { Length } from 'class-validator';

@ObjectType()
export class Post {
  @Field()
  id: number;

  @Field()
  description: string;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreatePostInput implements Partial<Post> {
  @Field()
  @Length(10, 250)
  description: string;
}

@InputType()
export class UpdatePostInput implements Partial<Post> {
  @Field({ nullable: true })
  @Length(10, 250)
  description?: string;
}
