/* eslint-disable no-extend-native */
import _, { isEmpty, isNumber, uniqBy } from "lodash";

export const removeAccents = (str) => {
    if (!str) return "";
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
};

export const convertCode = (data) => {
    let code = {};
    data.map((element) => {
        code[element.code] = element;
    });
    return code;
};

export const buildTreeMenu = (data) => {
    let map = new Map(data.map((v) => [v.code, v]));
    for (let value of map.values()) {
        value.link =
            "/" +
            removeAccents(value.name)
                .replace(/,/g, "")
                .replace(/\s/g, "-")
                .toLowerCase();
        if (value.parent_code && map.get(value.parent_code)) {
            let parent = map.get(value.parent_code);
            value.link = `${parent.link}${value.link}`;
            parent.children = parent.children ? [...parent.children, value] : [value];
        }
    }
    const tree = data.filter((v) => !v.parent_code);
    return tree;
};

export const buildTree = (data) => {
    let map = new Map(data.map((v) => [v.code, v]));
    for (let value of map.values()) {
        if (value.parent_code && map.get(value.parent_code)) {
            let parent = map.get(value.parent_code);
            parent.children = parent.children ? [...parent.children, value] : [value];
        }
    }
    const tree = data.filter((v) => !v.parent_code || !map.get(v.parent_code));
    return tree;
};


export function convertToQuery(param) {
    return (
        "" +
        Object.keys(param)
            .map(function (key) {
                return encodeURIComponent(key) + "==" + encodeURIComponent(param[key]);
            })
            .join(";")
    );
}

export function convertParamsToQuery(param) {
    return (
        "?" +
        Object.keys(param)
            .map(function (key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(param[key]);
            })
            .join("&")
    );
}

export function checkKeyNull(obj) {
    for (let v in obj) {
        switch (typeof obj[v]) {
            case "number":
                if (isNaN(obj[v]) || obj[v] == null) delete obj[v];
                break;
            case "string":
                if (isEmpty(obj[v])) delete obj[v];
                else obj[v] = obj[v].trim();
                break;
            default:
                if (obj[v] == null) delete obj[v];
                break;
        }
    }
    return obj;
}

export function removeDuplitcate(med) {
    const arr = [];
    med.reduce((acc, curr) => {
        if (acc.indexOf(curr.position) === -1) {
            acc.push(curr.position);
            arr.push(curr);
        }
        return acc;
    }, []);

    return arr;
}

export const isAllItemOnPageChecked = (parent, child, key) => {
    return (
        !isEmpty(child) &&
        child.every((elm) => parent.findIndex((i) => i[key] === elm[key]) > -1)
    );
};

export const removeCheckAllItems = (parent, child, key) => {
    return parent.filter(
        (elm) => child.findIndex((i) => i[key] === elm[key]) < 0
    );
};

export const addAllItemOfPage = (targetArray, arrayForAdd, key) => {
    return uniqBy([...arrayForAdd, ...targetArray], key);
};

export const addAnItems = (targetArray, itemForAdd, key) => {
    const arrayAfterFilterItem = targetArray.filter(
        (elm) => elm[key] !== itemForAdd[key]
    );
    if (arrayAfterFilterItem.length === targetArray.length) {
        arrayAfterFilterItem.push(itemForAdd);
    }
    return arrayAfterFilterItem;
};

export const isItemChecked = (parent, itemForCheck, key) => {
    return Boolean(
        parent.filter((elm) => elm[key] === itemForCheck[key]).length > 0
    );
};

export const selectedItem = (parent, itemForSelect) => {
    return uniqBy([...parent, ...[itemForSelect]]);
};

String.prototype.generatePassword = function () {
    return Array(parseInt(this))
        .fill(
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()"
        )
        .map(
            (x) =>
                x[
                Math.floor(
                    (crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)) *
                    x.length
                )
                ]
        )
        .join("");
};

export const generatePassword = (length) => {
    const strongRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\&\*\(\)\_\+\-\=\[\]\|\,\.\/\?\>\<])[A-Za-z\d\!\@\#\$\%\&\*\(\)\_\+\-\=\[\]\|\,\.\/\?\>\<]{8,15}$/;
    let pass = length.toString().generatePassword();
    while (!strongRegex.test(pass)) {
        pass = length.toString().generatePassword();
    }
    return pass;
};

export const convertObjectToQuery = (obj, char = "==") => {
    Object.keys(obj || {}).forEach((key) => {
        const value = obj[key];
        if (isEmpty(value) && !isNumber(value)) {
            delete obj[key];
        }
    });

    const arr = Object.keys(obj || {}).map((key) => {
        const value = obj[key].toString().trim();
        if (["ostar"].includes(key) || char !== "==") {
            return `${key}${char}${value}`;
        }
        if (/=in$/.test(key)) {
            return `${key}=(${value})`;
        }
        if (/=$/.test(key)) {
            return `${key}=${value}`;
        }

        return `${key}${char}"*${value}*"`;
    });
    return arr.join(";");
};

export const convertObjectToUrl = (obj) => {
    Object.keys(obj || {}).forEach((key) => {
        const value = obj[key];
        if (isEmpty(value) && !isNumber(value)) {
            delete obj[key];
        }
    });

    const arr = Object.keys(obj || {}).map((key) => {
        const value = obj[key];
        if (key === "sort" || key === "sorts") {
            return `${key}=${convertObjectToQuery(value, ":")}`;
        }
        if (/=in$/.test(key)) {
            return `${key}=(${value})`;
        }
        if (_.isObject(value)) {
            return `${key}=${convertObjectToQuery(value)}`;
        }
        return `${key}=${value.toString().trim()}`;
    });
    return "?" + arr.join("&");
};

export const convertSVGToString = (svg) => {
    try {
        // let buffer = Buffer.from(svg);
        // let base64data = buffer.toString("base64");
        // return `data:image/svg+xml;base64,${base64data}`;
        return `data:image/svg+xml;base64,${svg}`;
        // return `data:image/png;base64,${base64data}`;
    } catch (error) {
        return "";
    }
};
export const convertBase64 = (val) => {
    try {
        return `data:image/png;base64,${val}`;
    } catch (error) {
        return "";
    }
};

export const trimObject = (obj) => {
    const trimed = JSON.stringify(obj, (key, value) => {
        if (typeof value === "string") {
            return value.trim();
        }
        return value;
    });
    return JSON.parse(trimed);
};

const SUCCESS_STATUS = [200, 201, 202, 203, 204];
export const checkCallAPI = (response, onSuccess, onError) => {
    if (response?.status && SUCCESS_STATUS.includes(response.status)) {
        onSuccess(response.data);
        return;
    }
    onError({ data: response?.data, statusText: response?.statusText });
};

export const callAPIPaging = (props) => {
    const { response, onSuccess, onError, size: limit } = props;
    if (SUCCESS_STATUS.includes(response?.code || response?.status)) {
        const returnData = {
            data: response?.data,
            meta: { totalPage: 0, totalItems: 0 },
        };
        if (response.headers["x-total-count"]) {
            const allDataCount = response.headers["x-total-count"];
            returnData.meta.totalItems = allDataCount;
            if (
                Number(allDataCount) / Number(limit) >
                Math.round(Number(allDataCount) / Number(limit))
            ) {
                returnData.meta.totalPage =
                    Math.round(Number(allDataCount) / Number(limit)) + 1;
            } else {
                returnData.meta.totalPage = Math.round(
                    Number(allDataCount) / Number(limit)
                );
            }
        }
        onSuccess(returnData);
        return;
    }
    onError({ data: response?.data, statusText: response?.statusText });
};

export const formatInputNumber = (n) => {
    if (!n) return "";
    return n
        ?.replace(/\D/g, "")
        ?.replace(/\B(?=(\d{3})+(?!\d))/g, "")
        ?.trim();
};
