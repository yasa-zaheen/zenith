import { TailSpin } from "react-loader-spinner";

function LoadingButton({
  children,
  loading,
}: {
  children: any;
  loading: boolean;
}) {
  return (
    <button
      type="submit"
      className="bg-black text-white w-full flex items-center justify-center py-2 px-4 hover:bg-orange-400 duration-100 ease-in-out active:brightness-90"
    >
      {loading ? (
        <TailSpin
          height="20"
          width="20"
          color="#ffffff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        children
      )}
    </button>
  );
}

export default LoadingButton;
