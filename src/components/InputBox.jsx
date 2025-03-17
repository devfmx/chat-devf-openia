import React from "react";
import { useForm } from "react-hook-form";
import useOpenApi from "../hooks/useOpenApi";
import { useGlobal } from "../context/global-context";

const InputBox = () => {
  const context = useGlobal();
  const { handleSendMessage, onLoading } = useOpenApi();
  const { register, handleSubmit, ...hook } = useForm();
  const onSubmit = handleSubmit((data) => {
    handleSubmit(handleSendMessage(data.message));
    context.dispatch({
      type: "@USER_MESSAGE",
      payload: data.message,
    });
    setTimeout(() => {
      // LIMPIAR EL INPUT
      hook.reset();
    }, 1000);
  });

  return (
    <div className="flex w-3/4 bg-[#404045] text-white rounded-2xl py-4 my-4 items-end">
      <form onSubmit={onSubmit} className="flex w-full">
        <textarea
          {...register("message")}
          disabled={onLoading}
          name="message"
          className="ml-2 flex-1 p-2 resize-none focus:outline-none"
          placeholder="Escribe tu mensaje..."
        />
        <button
          type="submit"
          className="bg-[#71717A] hover:bg-gray-600 text-white font-semibold h-10 w-10 p-2 flex justify-center rounded-full ml-2 mr-2 cursor-pointer"
        >
          {onLoading ? (
            <div className="flex justify-center items-center w-full h-full">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            </div>
          ) : (
            <img src="/send-icon.svg" alt="Enviar" />
          )}
        </button>
      </form>
    </div>
  );
};

export default InputBox;
