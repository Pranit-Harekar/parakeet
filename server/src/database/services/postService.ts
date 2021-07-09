import { Service } from 'typedi';
import { Post } from '../entity/Post';
import { CreatePostInput, UpdatePostInput } from '../../schema/post';

@Service()
export class PostService {
  getAll = async (): Promise<Post[]> => {
    return await Post.find();
  };

  getOne = async (id: number): Promise<Post | undefined> => {
    const post = await Post.findOne({ where: { id } });

    if (!Post) {
      throw new Error(`The Post with id: ${id} does not exist!`);
    }
    return post;
  };

  create = async (createPostInput: CreatePostInput): Promise<Post> => {
    return await Post.create(createPostInput).save();
  };

  update = async (
    id: number,
    updatePostInput: UpdatePostInput,
  ): Promise<Post> => {
    const PostFound = await Post.findOne({ where: { id } });

    if (!PostFound) {
      throw new Error(`The Post with id: ${id} does not exist!`);
    }

    Object.assign(PostFound, updatePostInput);
    const updatedPost = await PostFound.save();

    return updatedPost;
  };

  delete = async (id: number): Promise<boolean> => {
    const PostFound = await Post.findOne({ where: { id } });

    if (!PostFound) {
      throw new Error(`The Post with id: ${id} does not exist!`);
    }

    await PostFound.remove();

    return true;
  };
}
