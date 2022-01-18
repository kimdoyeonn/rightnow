import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../../api/admin';
import { useAppSelector } from '../../../config/hooks';
import { userAccessToken } from '../../../reducers/userSlice';
import defaultProfile from '../../../images/profile.png';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HelpIcon from '@material-ui/icons/Help';
interface IReporter {
  reporter: string;
  date: string;
}

interface IReport {
  message: string;
  complete: string;
  aboutReporters: IReporter[];
}

interface IData {
  reportedUser: string;
  profile_image: string | null;
  block_date: string | null;
  aboutReport: IReport[];
}

const User = () => {
  // 프로필 이미지 서버 엔드포인트
  const imageEndpoint = process.env.REACT_APP_IMAGE_ENDPOINT;

  // 정지 기간
  const block_date_option = ['3', '7', '14', '30', '영구'];

  // user의 accessToken
  const aceessToken = useAppSelector(userAccessToken);
  console.log(aceessToken)
  // 신고목록
  const [reportList, setReportList] = useState<[]>([]);
  const getReportList = async () => {
    await adminAPI
      .getList(aceessToken)
      .then((res) => {
        console.log(res.data.data.reportedUserInfo);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect((): void => {
    getReportList();
  }, []);
  // 선택한 더 보기 인덱스
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // 배경 클릭 했을 때 더 보기 닫기
  document.body.addEventListener('click', () => {
    setSelectedIndex(-1);
  });

  // user block
  const blockUser = async (date: string, email: string) => {
    if (date === '영구') {
      alert(`${email} 영구 정지`);
    } else {
      alert(`${email} ${date}일 동안 정지`);
    }
  };

  const data: IData[] = [
    {
      reportedUser: 'test@naver.com',
      profile_image: null,
      block_date: '2021-01-03 12:11:23',
      aboutReport: [
        {
          message: '메세지 신고 처리',
          complete: 'N', // 처리 된 건은 파란색으로 표시
          aboutReporters: [
            {
              reporter: 'test2@naver.com',
              date: '2021-01-01 23:11:00',
            },
            {
              reporter: 'test3@naver.com',
              date: '2021-01-03 12:11:23',
            },
          ],
        },
        {
          message: 'hi',
          complete: 'Y', // 처리 안된 건은 토마토컬러로 표시
          aboutReporters: [
            {
              reporter: 'test2@naver.com',
              date: '2021-01-01 23:11:00',
            },
            {
              reporter: 'test3@naver.com',
              date: '2021-01-03 12:11:23',
            },
          ],
        },
        {
          message: 'hi',
          complete: 'Y', // 처리 안된 건은 토마토컬러로 표시
          aboutReporters: [
            {
              reporter: 'test2@naver.com',
              date: '2021-01-01 23:11:00',
            },
            {
              reporter: 'test3@naver.com',
              date: '2021-01-03 12:11:23',
            },
          ],
        },
        {
          message: 'hi',
          complete: 'Y', // 처리 안된 건은 토마토컬러로 표시
          aboutReporters: [
            {
              reporter: 'test2@naver.com',
              date: '2021-01-01 23:11:00',
            },
            {
              reporter: 'test3@naver.com',
              date: '2021-01-03 12:11:23',
            },
          ],
        },
      ],
    },
    {
      reportedUser: 'test2@naver.com',
      profile_image: null,
      block_date: null,
      aboutReport: [
        {
          message: '메세지 신고 처리',
          complete: 'N', // 처리 된 건은 파란색으로 표시
          aboutReporters: [
            {
              reporter: 'test2@naver.com',
              date: '2021-01-01 23:11:00',
            },
            {
              reporter: 'test3@naver.com',
              date: '2021-01-03 12:11:23',
            },
          ],
        },
        {
          message: 'hi',
          complete: 'N', // 처리 안된 건은 토마토컬러로 표시
          aboutReporters: [
            {
              reporter: 'test2@naver.com',
              date: '2021-01-01 23:11:00',
            },
            {
              reporter: 'test3@naver.com',
              date: '2021-01-03 12:11:23',
            },
          ],
        },
        {
          message: 'hi',
          complete: 'N', // 처리 안된 건은 토마토컬러로 표시
          aboutReporters: [
            {
              reporter: 'test2@naver.com',
              date: '2021-01-01 23:11:00',
            },
            {
              reporter: 'test3@naver.com',
              date: '2021-01-03 12:11:23',
            },
          ],
        },
        {
          message: 'hi',
          complete: 'N', // 처리 안된 건은 토마토컬러로 표시
          aboutReporters: [
            {
              reporter: 'test2@naver.com',
              date: '2021-01-01 23:11:00',
            },
            {
              reporter: 'test3@naver.com',
              date: '2021-01-03 12:11:23',
            },
          ],
        },
      ],
    },
  ];

  // help 메세지 보임 유무
  const [isVisibleHelp, setIsVisibleHelp] = useState<boolean>(false);

  return (
    <>
      <div className="w-215 text-xs text-sub pb-18">
        <div className="flex items-center fixed w-215 z-20 bg-white font-semibold pt-5 -mt-5 pb-1">
          <div className="w-1/5 pl-10">이메일</div>
          <div className="w-1/5">정지상태(~까지 정지)</div>
          <div className="w-1/5 flex items-center relative">
            <div>메세지</div>
            <div
              className="ml-1 flex items-center justify-center cursor-help relative"
              onMouseOver={() => {
                setIsVisibleHelp(true);
              }}
              onMouseLeave={() => {
                setIsVisibleHelp(false);
              }}
            >
              <HelpIcon style={{ fontSize: 20 }} />
            </div>
            <div
              className={`absolute left-18 top-0 w-60 p-2 rounded-md shadow-md border-1 text-xs font-normal bg-white ${
                isVisibleHelp ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="text-blue-600 font-semibold">파란색</span>{' '}
              메세지는 처리가 된 메세지,{' '}
              <span className="text-main font-semibold">빨간색</span> 메세지는
              처리가 되지 않은 메세지 입니다. 신고 된 유저를 제재하면 현재
              존재하는 비처리 건은 모두 처리 된 메세지로 바뀝니다.
            </div>
          </div>
          <div className="w-1/5">신고자</div>
          <div className="w-1/5">신고일</div>
        </div>
        <div className="relative top-7">
          {data.map((obj, index) => {
            const { reportedUser, profile_image, block_date, aboutReport } =
              obj;
            return (
              <div
                className={`flex items-center w-full relative py-2 ${
                  index !== data.length - 1 && 'border-b-1'
                }`}
                key={reportedUser}
              >
                <div
                  className={'h-7 w-7 rounded-full absolute left-0'}
                  style={{
                    backgroundImage: `url(${
                      profile_image === null
                        ? defaultProfile
                        : profile_image.indexOf('kakaocdn') !== -1 ||
                          profile_image.indexOf('googleusercontent') !== -1
                        ? profile_image
                        : imageEndpoint + profile_image
                    })`,
                    backgroundSize: 'cover',
                  }}
                />
                <div className="w-1/5 pl-10 overflow-hidden text-ellipsis whitespace-nowrap">
                  {reportedUser}
                </div>
                <div className="w-1/5 overflow-hidden text-ellipsis whitespace-nowrap">
                  {block_date === null ? '사용 중' : block_date}
                </div>
                <div className="w-3/5 pr-10">
                  {aboutReport.map((val, idx) => {
                    const { message, complete, aboutReporters } = val;
                    return (
                      <div
                        key={idx}
                        className={`w-full flex items-center py-1 ${
                          idx !== aboutReport.length - 1 && 'border-b-1'
                        }`}
                      >
                        <div
                          className={`w-1/3 break-words ${
                            complete === 'Y' ? 'text-blue-600' : 'text-main'
                          }`}
                        >
                          {message}
                        </div>
                        <div className="w-2/3">
                          {aboutReporters.map((v, i) => {
                            const { reporter, date } = v;
                            return (
                              <div className="w-full flex item-center">
                                <div className="w-1/2 overflow-hidden text-ellipsis whitespace-nowrap">
                                  {reporter}
                                </div>
                                <div className="w-1/2 overflow-hidden text-ellipsis whitespace-nowrap">
                                  {date}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  className={'h-7 w-7 rounded-full absolute right-0'}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  }}
                >
                  <div className="relative">
                    <IconButton size="small">
                      <MoreVertIcon />
                    </IconButton>
                    {selectedIndex === index && (
                      <div
                        className=" bg-white absolute right-8 -top-19 z-10 w-32 py-2 border-1 rounded-md text-xs text-slate-500 shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {block_date_option.map((v) => {
                          return (
                            <p
                              key={v}
                              className="hover:bg-gray-100 cursor-pointer px-2 py-2"
                              onClick={() => {
                                blockUser(v, reportedUser);
                                setSelectedIndex(-1);
                              }}
                            >
                              {v === '영구' ? '영구 정지' : `${v}일 정지`}
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default User;
