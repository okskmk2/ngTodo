import {NewsVO} from './news.vo';

export class ResultVO {
  result: number;
  value: string;
  data?: any;      // 실제 데이터
  total?: number; // 전체 갯수: 페이지네이션을 구현하기 위해서 필요한 변수
}
