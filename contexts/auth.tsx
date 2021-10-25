import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';
import api from '../services/api';

//api here is an axios instance which has the baseURL set according to the env.

interface IUser {
  name: string;
}

type UserType = (IUser & Record<string, unknown>) | null;

const initialValues = {
  isAuthenticated: false,
  user: null as UserType,
  login: (email: string, password: string) => {},
  logout: () => {},
  can: (slug: string) => Boolean,
  loading: false,
  isLoading: false,
};
const AuthContext = createContext<typeof initialValues>(initialValues);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState<Array<any>>([]);

  // const {api} = useApi()

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      if (token) {
        setLoading(true);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        api
          .get('users/me')
          .then((resp) => {
            setUser(resp.data);
            setPermission(resp.data.permissions);
          })
          .catch((re) => {})
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
    loadUserFromCookies();
  }, []);

  const login = async (email: string, password: string) => {
    const { data: token } = await api.post('auth/login', { email, password });
    if (token) {
      Cookies.set('token', token.accessToken, { expires: 60 });
      api.defaults.headers.Authorization = `Bearer ${token.accessToken}`;
      const { data: user } = await api.get('users/me');
      setUser(user);
      setPermission(user?.permissions);
    }

    return false;
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    delete api.defaults.headers.Authorization;
    window.location.pathname = '/login'; // todo
  };

  const can = useCallback(
    (slug: string): any => {
      const reallyCan = permission.filter((pem) => pem.slug == slug)[0];
      if (reallyCan) return true;
      return false;
    },
    [permission],
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: user ? true : false,
        user,
        login,
        can,
        loading,
        isLoading: loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
