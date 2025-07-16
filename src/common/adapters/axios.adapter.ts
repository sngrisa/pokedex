import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http.interfaces";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private Axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.Axios.get<T>(`${url}`);
            return data;
        } catch (err: unknown) {
            throw new NotFoundException('Axios is not found!!!!');
        }
    }
}