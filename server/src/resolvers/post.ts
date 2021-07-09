import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Service } from 'typedi';
import { Post, CreatePostInput, UpdatePostInput } from '../schema/post';
import { PostService } from '../database/services/postService';

@Service()
@Resolver((of) => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query((returns) => [Post], { nullable: true })
  async getPosts(): Promise<Post[]> {
    return await this.postService.getAll();
  }

  @Query((returns) => Post, { nullable: true })
  async getPost(@Arg('id') id: number): Promise<Post | undefined> {
    return await this.postService.getOne(id);
  }

  @Mutation((returns) => Post)
  async addPost(
    @Arg('PostInput') createPostInput: CreatePostInput,
  ): Promise<Post> {
    return await this.postService.create(createPostInput);
  }

  @Mutation((returns) => Post)
  async updatePost(
    @Arg('id') id: number,
    @Arg('PostInput') updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    return await this.postService.update(id, updatePostInput);
  }

  @Mutation((returns) => Boolean)
  async deletePost(@Arg('id') id: number): Promise<boolean> {
    return await this.postService.delete(id);
  }
}
