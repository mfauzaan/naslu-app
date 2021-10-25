import React, { createContext, useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useApi } from "./api";


const FormContext = createContext({
  data: {}
});

export const FormProvider = ({ children, model, type, id }: any) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const {api} = useApi()

  

  const canIKeekay = () => {
    alert('wd')
  }

  return (
    <FormContext.Provider
      value={{ data: formData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
