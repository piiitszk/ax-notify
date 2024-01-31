## Overview

This Lua-based notification system is designed to replicate an iOS-style notification experience within a FiveM server.

## Functions

### Create

```lua
--@param title
--@type String
--@description Set notification title

--@param description
--@type String
--@description Set notification description

--@param icon?
--@type String
--@description Set notification icon defined at settings.lua

--@param seconds?
--@type String
--@description Time limit in seconds

--@param sound?
--@type Boolean
--@description Force sound

exports["ax-notify"]:Create({
    title = "Tinder",
    seconds = 5,
    description = "Things are heating up between you and Caroline 👀🔥",
    icon = "tinder",
    sound = true
})

TriggerEvent("Notify:Create", {
    title = "Paypal",
    seconds = 5,
    description = "You've received a payment of $100.00 USD from John Doe.",
    icon = "paypal",
    sound = true
})
```

### Set

```lua
--@param Value?
--@type Boolean
--@description Set user the current notification state

exports["ax-notify"]:Set({
    Value = false
})

TriggerEvent("Notify:Set", {
    Value = true
})

```

### Switch

```lua

exports["ax-notify"]:Switch()
TriggerEvent("Notify:Switch")

@Recommended

RegisterCommand("notifications", function()
    exports["ax-notify"]:Switch()

    -- Disable/Enable player notifications sound
end)
```