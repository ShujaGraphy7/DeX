function MessageBox() {
  return (
    <div className="mx-10">
      <div className="m-10 gradient-box rounded-2xl max-w-screen-sm mx-auto">
        <div className="text-white p-5 bg-[#000000b4] rounded-2xl">
          <div className="font-bold">Liquidity provider rewards.</div>
          <div className="text-justify">
            Liquidity providers earn a 0.3% fee on all trades proportional to
            their share of the pool. Fees are added to the pool, accrue in real
            time and can be claimed by withdrawing your liquidity.
          </div>
          <div className="underline">Read more about providing liquidity</div>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
