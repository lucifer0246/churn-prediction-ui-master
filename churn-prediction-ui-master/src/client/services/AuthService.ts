/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUser } from '../models/CreateUser';
import type { CreateUserResponse } from '../models/CreateUserResponse';
import type { GetCurrentUserResponse } from '../models/GetCurrentUserResponse';
import type { Login } from '../models/Login';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Create User
     * @returns CreateUserResponse Successful Response
     * @throws ApiError
     */
    public static createUserCreateUserPost({
requestBody,
}: {
requestBody: CreateUser,
}): CancelablePromise<CreateUserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/create-user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Login
     * @returns CreateUserResponse Successful Response
     * @throws ApiError
     */
    public static loginAuthPost({
requestBody,
}: {
requestBody: Login,
}): CancelablePromise<CreateUserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Current User
     * @returns GetCurrentUserResponse Successful Response
     * @throws ApiError
     */
    public static getCurrentUserCurrentUserGet(): CancelablePromise<GetCurrentUserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/current-user',
        });
    }

}
