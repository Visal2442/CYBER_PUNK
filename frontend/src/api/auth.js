import http from "@/axios-http";

export function register(user){
    return http.post("/register", user)
}
export function login(user){
    return http.post("/login", user)
}
export function logout(){
    return http.post("/logout")
}
export function fetchLandlords(){
    return http.get("/landlords")
}
export function fetchCustomers(){
    return http.get("/customers")
}
export function fetchUsers(){
    return http.get("/users")
}
export function sendEmail(email){
    return http.post("/reset_password_request", email)
}
export function resetPassword(data){
    return http.post("/reset_password", data)
}