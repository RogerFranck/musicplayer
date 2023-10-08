import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { useMutation } from 'react-query'

interface axiosUrlProps {
  url: string;
  id? :string
  data?: any
}

interface useGetProps {
  url: string;
  store: string;
  itemList: string;
  setItem: any
}

interface useMutationProps {
  url: string;
  setItem: any
  id?:string
  successMsg?:string;
  errorMsg?:string;
}

const instance = axios.create({
  baseURL: 'https://ws.audioscrobbler.com/2.0/',
});


export const axiosGet = ({ url }: axiosUrlProps) => instance.get(url);
export const axiosPost = ({ url, data }: axiosUrlProps) => instance.post(url, data);
export const axiosDelete = ({ url }: axiosUrlProps) => instance.delete(url);
export const axiosPut = ({ url, data }: axiosUrlProps) => instance.put(url ,data);

export const useGet = ({ url, store, itemList, setItem }: useGetProps) => {
  const selector = (state: any) => state[store][itemList]
  const itemArray = useAppSelector(selector);
  const dispatch = useAppDispatch();
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorResponse, setError] = useState<any>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosGet({ url });
        dispatch(setItem(response.data)); 
      } catch (error) {
        setError(error)
        console.error(error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchData();
  }, [url, dispatch]);

  return { data: itemArray, isLoading, errorResponse, };
};

export const usePost = ({ url, setItem, successMsg = "Agregado con exito!!", errorMsg = "Error" }: useMutationProps) => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await axiosPost({url, data})
        dispatch(setItem(response.data)); 
        console.log(successMsg);
      return response.data
      } catch (error) {
        console.error(errorMsg);
      }
    },
  })  
};

export  const useDelete = ({ url, setItem }: useMutationProps) => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (id: any) => {
      try {
        const response = await axiosDelete({url: `${url}/${id}`})
        dispatch(setItem(id)); 
        console.log('Eliminación exitosa!!');
        return response.data
      } catch (error) {
        console.error(error);
      }
     
    },
  })  
}

export const usePut = ({ url, setItem }: useMutationProps) => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async ( { id, data} : any) => {
      try {
        const response = await axiosPut({url: `${url}/${id}`, data})
        dispatch(setItem(response.data)); 
        console.log('Edición exitosa!!');
        return response.data
      } catch (error) {
        console.error(error);
      }
      
    },
  })  
};