import axios from "axios";

const baseURL = 'http://3.83.243.144/api/v1';

const axiosApi = axios.create({
  baseURL: 'http://3.83.243.144/api/v1',
});

const axiosApiReq = axios.create({
  baseURL: 'http://3.83.243.144/api/v1',
  withCredentials: true,
});

const axiosAdmin = axios.create({
  baseURL: 'http://3.83.243.144/api/v1/admin',
});

const axiosOrganisation = axios.create({
  baseURL: 'http://3.83.243.144/api/v1/organization',
});

const axiosOrganisationReq = axios.create({
  baseURL: 'http://3.83.243.144/api/v1/organization',
  withCredentials: true,
});

const axiosAdminReq = axios.create({
  baseURL: 'http://3.83.243.144/api/v1/admin',
  withCredentials: true,
});

export { axiosApi, axiosApiReq, axiosAdmin, axiosOrganisation, axiosOrganisationReq, axiosAdminReq, baseURL };
