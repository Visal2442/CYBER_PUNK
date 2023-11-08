import http from "@/axios-http";

export function fetchProperties(){
    return http.get("/properties")
}