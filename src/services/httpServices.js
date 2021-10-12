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
                // Do something before request is sent
                // config.headers.Authorization = `Bearer ${token}`;
                config.headers.Authorization = `TRUEHOPE ConnectId=7e41c1015ef74c129e8e8ab20d75bf01,Timestamp=1633939387,Signature=4ce8b93ee3bbf73cf5cd9ea18a2ef5ef7761c8e85e898d6fd197afd1042878c7`;
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
                console.log("vào đây")
                if ((url || "").includes("/api/auth")) {
                    return;
                }
                // clear token
                localStorage.removeItem("authUser");
                window.location.reload();
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
