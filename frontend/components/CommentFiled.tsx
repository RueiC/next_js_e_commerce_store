import { useState, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { useStateContext } from '../context/StateContext';
import useComment from '../hooks/useComment';
import { client } from '../utils/client';
import { Pagination, StarRating, Comment, ConfirmModal } from './index';

interface ModalStatus {
  toggle: boolean;
  productId: string;
  _key: string;
}

interface SubmitState {
  style: string;
  text: string;
  state: string;
}

const CommentFiled = ({ id }: { id: string }) => {
  const [commentInput, setCommentInput] = useState<string>('');
  const [rating, setRating] = useState<number>(3);
  const [isModalOpen, setIsModalOpen] = useState<ModalStatus>({
    toggle: false,
    productId: '',
    _key: '',
  });
  const [submitState, setSubmitState] = useState<SubmitState>({
    style: 'bg-asparagus-3',
    text: '留言',
    state: 'none',
  });
  const [deleteState, setDeleteState] = useState<SubmitState>({
    style: 'bg-red-500',
    text: '刪除',
    state: 'none',
  });

  const { user } = useStateContext();

  const { comments, currentPage, setCurrentPage, fetchComments, setComments } =
    useComment(id);

  const addComment = async (comment: string, rating: number): Promise<void> => {
    if (comment === '') {
      toast('請輸入內容', { type: 'error' });
      return;
    }
    if (!user) {
      toast('請先登入', { type: 'error' });
      return;
    }

    setSubmitState({
      style: 'bg-gray-300',
      text: '處理中',
      state: 'loading',
    });

    const commentData = {
      comment,
      rating,
      createdAt: new Date().toISOString(),
      postedBy: {
        _type: 'postedBy',
        _ref: user._id,
      },
    };

    setCommentInput('');

    await client
      .patch(id) // Document ID to patch
      .setIfMissing({ comments: [] }) // Add the items after the last item in the array (append)
      .append('comments', [commentData])
      .commit({ autoGenerateArrayKeys: true }) // Perform the patch and return a promise
      .then(() => {
        setSubmitState({
          style: 'bg-asparagus-3',
          text: '留言',
          state: 'none',
        });

        fetchComments();
        toast('留言成功!', { type: 'success' });
      })
      .catch((err) => {
        console.error('Oh no, the update failed: ', err.message);
      });
  };

  const deleteComment = async (): Promise<void> => {
    if (isModalOpen._key === '' || isModalOpen.productId === '') return;

    setDeleteState({
      style: 'bg-red-300',
      text: '刪除中',
      state: 'loading',
    });

    await client
      .patch(isModalOpen.productId)
      .unset([`comments[_key == "${isModalOpen._key}"]`])
      .commit()
      .then(() => {
        setDeleteState({
          style: 'bg-red-500',
          text: '刪除',
          state: 'none',
        });
        if (!comments) return;

        const newComments = comments.filter((comment) => {
          return comment._key !== isModalOpen._key;
        });

        setComments(newComments);
        setIsModalOpen({
          toggle: false,
          productId: '',
          _key: '',
        });
        toast('留言刪除成功!', { type: 'success' });
      });
  };

  return (
    <>
      {isModalOpen.toggle ? (
        <ConfirmModal
          deleteComment={deleteComment}
          setIsModalOpen={setIsModalOpen}
          deleteState={deleteState}
        />
      ) : null}

      <div className='relative flex flex-col gap-[2rem]'>
        <form
          className='flex flex-col md:flex-row items-center gap-[2.5rem]'
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            addComment(commentInput, rating);
          }}
        >
          <input
            className='w-full py-[2rem] rounded-[1rem] px-[4rem] flex-1 text-text-1 shadow-sm outline-none'
            type='text'
            placeholder='留下您的評論：）'
            value={commentInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCommentInput(e.target.value)
            }
          />

          <StarRating rating={rating} setRating={setRating} />

          <button
            className={`${submitState.style} rounded-[1.5rem] text-white px-[4rem] py-[1.5rem] text-[1.8rem] h-full font-bold hover:scale-105 transition-all duration-300 ease-in-out`}
            type='submit'
            disabled={submitState.state === 'loading' ? true : false}
          >
            {submitState.text}
          </button>
        </form>
      </div>

      {comments
        ? comments.map((comment) => (
            <Comment
              key={comment._key}
              _key={comment._key}
              postedBy={comment.postedBy}
              comment={comment.comment}
              createdAt={comment.createdAt}
              rating={comment.rating}
              productId={id}
              setIsModalOpen={setIsModalOpen}
            />
          ))
        : null}

      {comments && comments.length > 5 ? (
        <Pagination
          commentPerPage={5}
          totalComments={comments.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </>
  );
};

export default CommentFiled;
