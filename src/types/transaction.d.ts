export type QrPayReqType = {
  withdrawId: number;
  depositId: number;
  lessonId: number;
  lessondateId: number;
  payment: number;
};

interface PaybackReqType {
  reservationId: number;
}
