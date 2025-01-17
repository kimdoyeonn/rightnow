import React, { MouseEventHandler, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import ModalTemp from '../components/ModalTemp';
import { useAppSelector } from '../config/hooks';
import {
  roomCategory,
  roomJoinCnt,
  roomLocation,
  roomMaxCnt,
} from '../reducers/roomSlice';

const Container = styled(ModalTemp)`
  @media only screen and (max-width: 600px) {
    & {
      background-color: lightblue;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  /* width: 30rem; */
  /* height: 25rem; */
  min-height: 15rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

const RoomTitle = styled.div`
  font-size: 1.5rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const Loading = styled.div`
  padding: 1.5rem 1rem;
  border-radius: 5px;
  background: #e4e4e4;
  width: 20rem;
  min-height: 6rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  grid-auto-rows: 3rem;
  margin-bottom: 2rem;
  @media screen and (max-width: 768px) {
    width: 15rem;
    grid-auto-rows: 2rem;
    min-height: 4rem;
    padding: 0.9rem 0.8rem;
  }
`;

const Join = styled.div`
  display: flex;
  justify-content: center;
`;

const Item = styled.div<{ type: string }>`
  width: 2.5rem;
  height: 2.5rem;
  background: ${(props) =>
    props.type === 'empty' ? '#c1c1c1' : props.theme.color.main};
  border-radius: 1.5rem;
  @media screen and (max-width: 768px) {
    width: 1.7rem;
    height: 1.7rem;
  }
`;

const ButtonContainer = styled.div``;

const Button = styled.button`
  width: 14rem;
  height: 2.2rem;
  border-radius: 3px;
  background: ${(props) => props.theme.color.main};
  color: black;

  &:active {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
`;

interface ModalProps {
  handleMatching: MouseEventHandler;
}

const MatchingModal = ({ handleMatching }: ModalProps) => {
  const location = useAppSelector(roomLocation);
  const category = useAppSelector(roomCategory);
  const joinCnt = useAppSelector(roomJoinCnt); // 모인 인원
  const maxCnt = useAppSelector(roomMaxCnt); // 채워져야 하는 인원
  console.log(maxCnt);
  /**
   * 사람이 모이는게 보이게 함(테스트용)
   */
  useEffect(() => {
    console.log(joinCnt);
  }, [joinCnt]);

  /**
   * joinCnt(모인 인원)와 maxCnt(모임의 최대 인원)로 현재 채워진 인원을 표시함
   *
   * @returns 채워진 인원을 표시
   */
  const JoinDisplay = (): ReactNode[] => {
    let result: ReactNode[] = [];
    for (let idx = 0; idx < maxCnt; idx++) {
      if (joinCnt > idx) {
        result.push(
          <Join>
            <Item type="join"></Item>
          </Join>,
        );
      } else {
        result.push(
          <Join>
            <Item type="empty"></Item>
          </Join>,
        );
      }
    }
    return result;
  };

  /**
   * 방 카테고리와 주소를 타이틀로 만들어서 반환함
   * @returns 타이틀
   */
  const roomTitle = () => {
    return `#${category} #${location.split(' ').join('_')}`;
  };

  return (
    <Container>
      <LoadingContainer>
        <RoomTitle>{roomTitle()}</RoomTitle>
        <Loading>{JoinDisplay()}</Loading>
        <ButtonContainer>
          <Button onClick={handleMatching}>뒤로가기</Button>
        </ButtonContainer>
      </LoadingContainer>
    </Container>
  );
};

export default MatchingModal;
