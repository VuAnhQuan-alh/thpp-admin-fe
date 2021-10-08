export const URL = "http://ec2-3-1-50-88.ap-southeast-1.compute.amazonaws.com:8080"
export const STATUS = {
    success: [200, 201, 204],
    auth: [401],
    notFound: [404],
    error: [500, 400],
}

export const signup = `${URL}/sprs/api/user`;
//
export const signin = `${URL}/authenticate`;
export const profile = `${URL}/sprs/api/user`;
//
export const groupList = `${URL}/sprs/api/group`
