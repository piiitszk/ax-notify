function Create(Object) 
    assert(type(Object) == "table", "Parameter must be of type table (current: "..type(Object)..") to create a notification.")
    
    Object.Assignature = GetInvokingResource()
    Object.Method = "Create"
    Object.icon = Icons[Object.icon] or nil

    SendNUIMessage(Object)
end

function Switch()
    SendNUIMessage({ Assignature = GetInvokingResource(), Method = "Switch" })
end

function Set(Object)
    assert(type(Object) == "table", "Parameter must be of type table (current: "..type(Object)..") to update notification.")

    Object.Assignature = GetInvokingResource()
    Object.Method = "Set"
    
    SendNUIMessage(Object)
end

RegisterNetEvent("Notify:Create", Create)
RegisterNetEvent("Notify:Switch", Switch)
RegisterNetEvent("Notify:Set", Set)

exports("Create", Create)
exports("Switch", Switch)
exports("Set", Set)