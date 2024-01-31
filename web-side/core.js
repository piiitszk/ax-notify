const Config = {
    Pendents: [],
    Notification: new Audio("./assets/notification.mp3"),
    NotificationActive: true,
    Production: true,
}

window.addEventListener("DOMContentLoaded", () => {
    Config["Container"] = document.getElementById("container")

    if (!Config.Production) {
        console.info("[DEV] CONNECTED.")
        console.info("[DEV] Use CreateNotify() to create notify.")

        const body = document.getElementsByTagName("body").item(0)
        body.style.backgroundColor = "rgb(28, 26, 26)" 
    }
})

window.addEventListener("message", (Message) => {
    const Data = Message.data

    switch (Data.Method) {
        case "Create":
            CreateNotify(Data)
            break
        
        case "Switch": 
            Config["NotificationActive"] = !Config["NotificationActive"]
            console.log(Config["NotificationActive"] ? "Notificações ativadas" : "Notificações desativadas")
            break

        case "Set":
            Config["NotificationActive"] = typeof Data.Value == "boolean" ? Data.Value : Config["NotificationActive"]
            console.log(Config["NotificationActive"] ? "Notificações ativadas (Force)" : "Notificações desativadas (Force)")
            break
    }
})

function CreateComponent({ title, description, icon, seconds, sound }) {
    if (!title) { title = "Servidor" }
    if (!description) { description = "Ocorreu um erro ao processar essa mensagem." }

    icon = icon && (icon.includes("https://") || icon.includes("http://")) ? icon : "https://fivem.jesteriruka.dev/apps/sms.webp"
    
    seconds = typeof seconds == "number" ? seconds * 1000 : 7000
    sound = typeof sound == "boolean" ? sound : Config["NotificationActive"]

    return [
        `
            <header>
                <img src="${icon}">
                <span>MESSAGES</span>
            </header>

            <main>
                <span id="title">${title}</span>
                <span id="description">${description}</span>
            </main>
        `, seconds   
    ]
}

function CreateNotify(Data) {
    Data = Data instanceof Object ? Data : {}

    Config["Pendents"].push(CreateComponent(Data))
    
    if (Config["Container"].children.length > 0)
        return

    ShowNotify()
}

function ShowNotify(){
    const Element = document.createElement("div")

    Element.id = "notify"
    Element.innerHTML = Config["Pendents"][0][0]
    
    Config["Container"].insertAdjacentElement("afterbegin", Element)

    setTimeout(() => {
        fadeOut(Element)
        .then(() => {
            Config["Container"].removeChild(Element)
            Config["Pendents"].splice(0, 1)
    
            if (Config["Pendents"].length > 0) {    
                ShowNotify() 
            }  
        })
    }, Config["Pendents"][0][1])

    if (!Config["NotificationActive"])
        return

    Config["Notification"].play()
}

function fadeOut(Element) {
    return new Promise((resolve) => {
        var Effect = setInterval(function () {
            if (!Element.style.opacity) {
                Element.style.opacity = 1.0
            }

            if (Element.style.opacity > 0) {    
                Element.style.opacity -= 0.1;
            } else {
                clearInterval(Effect)
                resolve()
            }
          }, 20)
    })
}