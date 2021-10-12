import axios from "axios";
class Services {
    axios;
    interceptors;

    constructor() {
        this.axios = axios;
        this.interceptors = null;
        this.axios.defaults.withCredentials = false;
        this.axios.defaults.timeout = 300000;
        // this.axios.defaults.headers.common["Content-Type"] = `application/json`;
        this.axios.defaults.headers = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",
            // "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json"
        };
    }

    attachTokenToHeader(token) {
        this.interceptors = this.axios.interceptors.request.use(
            function (config) {
                config.headers.Authorization = `${token}`;
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
    }

    clearAuthorizationToken = () => {
        delete this.axios.defaults.headers.common["Authorization"];
    }

    saveLocalStorage(data) {
        window.localStorage.setItem("userSPRS", JSON.stringify(data));
    }

    clearLocalStorage() {
        window.localStorage.removeItem("userSPRS");
    }

    handleResponse(response, error, isSuccess, url) {
        if (isSuccess) {
            return response;
        } else {
            if (error.response && error.response.status === 401) {
                if ((url || "").includes("/api/auth")) {
                    return;
                }
                // clear token
                localStorage.removeItem("authUser");
                // window.location.reload();
                return;
            }
            return error.response;
        }
    }
    removeInterceptors() {
        this.axios.interceptors.request.eject(this.interceptors);
    }

    async get(url, config) {
        try {
            const response = await this.axios.get(url, config);
            return this.handleResponse(response, {}, true, url);
        } catch (error) {
            return this.handleResponse({}, error, false, url);
        }
        // return this.axios.get(...arg);
    }

    async post(url, data, config) {
        try {
            const response = await this.axios.post(url, data, config);
            return this.handleResponse(response, {}, true, url);
        } catch (error) {
            return this.handleResponse({}, error, false, url);
        }
        // return this.axios.post(url, data, config);
    }

    async delete(url, config) {
        try {
            const response = await this.axios.delete(url, config);
            return this.handleResponse(response, {}, true, url);
        } catch (error) {
            return this.handleResponse({}, error, false, url);
        }
        // return this.axios.delete(url, config);
    }

    async put(url, data, config) {
        try {
            const response = await this.axios.put(url, data, config);
            return this.handleResponse(response, {}, true, url);
        } catch (error) {
            return this.handleResponse({}, error, false, url);
        }
    }
}

export default new Services();
