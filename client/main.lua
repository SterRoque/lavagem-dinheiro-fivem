local DISTANCE_INTERACT = 2.0
local isUIOpen = false

local function getWashLocation()
  local pos = GetEntityCoords(PlayerPedId())

  for _, loc in ipairs(Config.Locations) do
    if #(pos - loc.coords) <= DISTANCE_INTERACT then
      return loc.coords
    end
  end
end

local function openWashUI()
  if isUIOpen then return end
  isUIOpen = true

  SetNuiFocus(true, true)
  SendNUIMessage({ action = 'open' })
end

local function closeWashUI()
  isUIOpen = false
  SetNuiFocus(false, false)
  SendNUIMessage({ action = 'close' })
end

RegisterNUICallback('close', function(_, cb)
  closeWashUI()
  cb('ok')
end)

CreateThread(function()
  while true do
    local sleep = 1000
    local washCoord = getWashLocation()

    if washCoord then
      sleep = 0
      DrawText3D(washCoord, "[~g~E~w~] Lavar dinheiro")

      if IsControlJustReleased(0, 38) then
        print('abrindo ui')
        openWashUI()
      end
    end
    Wait(sleep)
  end
end)

function DrawText3D(coord, text)
  SetTextScale(0.35, 0.35)
  SetTextFont(4)
  SetTextProportional(true)
  SetTextColour(255, 255, 255, 215)
  SetTextEntry('STRING')
  SetTextCentre(true)
  AddTextComponentString(text)
  SetDrawOrigin(coord.x, coord.y, coord.z + 1.0, 0)
  DrawText(0.0, 0.0)
  ClearDrawOrigin()
end
