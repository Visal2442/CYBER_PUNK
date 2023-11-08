import http from "@/axios-http";

export function fetchProperties(){
    return http.get("/properties")
}
export function fetchPropertiesPerPage(){
    return http.get("/properties/pagination")
}
export function fetchPropertiesByUserId(userId){
    return http.get(`/getAllProperties/${userId}`)
}
export function deletePropertyById(propertyId){
    return http.delete(`/properties/delete/${propertyId}`)
}
export function updatePropertyById(propertyId, data){
    return http.put(`/updateProperty/${propertyId}`, data)
}