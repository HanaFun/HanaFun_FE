export const Calculator = () => {
  return (
    <div className='w-[351px] h-[338px] p-6 bg-white font-hanaMedium rounded-xl border-[1px] border-hanaSilver'>
      <div className='flex flex-row justify-center items-center'>
        {/* 아이콘1 */}
        <p>6월 매출액</p>
        {/* 아이콘2 */}
      </div>

      <div className='flex justify-between text-xl'>
        <p>매출액</p>
        <p>{}원</p>
      </div>

      <div className='flex justify-between'>
        <div className='flex flex-row'>
          <p>지출액</p>
          {/* pencil 아이콘 */}
        </div>
      </div>

      <div className='text-[8px] text-hanaSilver'>
        <div className='flex justify-between'>
          <p>재료비</p>
          <p>{}원</p>
        </div>
        <div className='flex justify-between'>
          <p>장소대여비</p>
          <p>{}원</p>
        </div>
        <div className='flex justify-between'>
          <p>기타비용</p>
          <p>{}원</p>
        </div>
      </div>
    </div>
  );
};
