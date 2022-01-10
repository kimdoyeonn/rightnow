import React, { useEffect, useState } from 'react';
import { showModal, modal, showAlert } from '../reducers/componetSlice';
import { useNavigate } from 'react-router-dom';
import { logout, userEmail } from '../reducers/userSlice';
import { useAppSelector, useAppDispatch } from '../config/hooks';
import userApi from '../api/userApi';

interface IProps {
  password?: string;
}

const Modal = ({ password }: IProps) => {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const email = useAppSelector(userEmail);
  // 모달 창의 타입지정
  const modalType: string = useAppSelector(modal);
  // 제목
  const [title, setTitle] = useState<string>('');
  // 부제목
  const [subTitle, setSubTitle] = useState<string>('');

  // 확인 클릭시 함수
  let onClickHandler = (): void => {
    if (modalType === 'logout') {
      closeModal();
      dispatch(logout());
      router('/auth/login');
      setTimeout(() => {
        dispatch(showAlert('logout'));
      }, 50);
    } else if (modalType === 'signout') {
      const body = {
        email: email,
        password: password,
      };
      const callback = (code: number) => {
        if (code === 200) {
          dispatch(logout());
          router('/');
          setTimeout(() => {
            dispatch(showAlert('signout'));
          }, 50);
        } else if (code === 404) {
          dispatch(showAlert('signoutWrongPassword'));
        }
      };
      closeModal();
      userApi('signout', body, callback);
    }
  };
  useEffect((): void => {
    switch (modalType) {
      case 'logout':
        setTitle('로그아웃');
        setSubTitle('정말로 로그아웃 하시겠습니까?');
        break;
      case 'signout':
        setTitle('계정삭제');
        setSubTitle('정말로 라잇나우 계정을 삭제하시겠습니까?');
        break;
    }
  }, [modalType]);

  const closeModal = (): void => {
    dispatch(showModal(''));
  };

  return (
    <>
      <div
        className={`w-full absolute top-0 left-0 bg-black bg-opacity-20 flex justify-center items-center ${
          modalType ? 'z-20 opacity-100 h-full' : '-z-10 opacity-0 h-0'
        }`}
        // onClick={closeModal}
      >
        <div
          className={`w-96 h-48 rounded-md bg-white relative p-6 border-1 shadow-md transition-all ${
            modalType ? 'opacity-100 top-0' : 'opacity-0 top-10'
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="text-lg font-bold">{title}</div>
          <div className="text-sm mt-4">{subTitle}</div>
          <div className="mt-8 text-right space-x-2 absolute bottom-6 right-6">
            <button
              className={`w-20 h-8 rounded-md border-1 border-main text-main text-sm`}
              onClick={closeModal}
            >
              취소
            </button>
            <button
              className={`w-20 h-8 rounded-md bg-main text-white text-sm`}
              onClick={onClickHandler}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
