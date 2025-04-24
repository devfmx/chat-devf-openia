import React from "react";
import { useForm } from "react-hook-form";
import useOpenApi from "../hooks/useOpenApi";

const InputBox = () => {
  const { handleSendMessage, response, onLoading } = useOpenApi();
  // por el momento mostramos la respuesta en consola
  console.log("response", onLoading);
  console.log(response);
  // EXPLICAR EL ...HOOK QUE ES UNA FORMA DE DESGLOSAR UN OBJETO
  const { register, handleSubmit, ...hook } = useForm();
  const onSubmit = handleSubmit((data) => {
    handleSubmit(handleSendMessage(data.message));
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
          name="message"
          className="ml-2 flex-1 p-2 resize-none focus:outline-none"
          placeholder="Escribe tu mensaje..."
        />
        <button
          type="submit"
          className="bg-[#71717A] hover:bg-gray-600 text-white font-semibold h-10 w-10 p-2 flex justify-center rounded-full ml-2 mr-2 cursor-pointer"
        >
          <img src="/send-icon.svg" alt="Enviar" />
        </button>
      </form>
    </div>
  );
};

export default InputBox;
