local QBCore = exports['qb-core']:GetCoreObject()

local function GetDirty(Player)
  local total = 0

  for _, item in pairs(Player.PlayerData.items or {}) do
    if item and item.name == 'markedbills' then
      local worth = (item.info and item.info.worth) or 0
      total = total + (worth * item.amount)
    end
  end

  return total
end

RegisterNetEvent('washing:requestDirty', function()
  local src = source
  local Player = QBCore.Functions.GetPlayer(src)
  if not Player then return end

  TriggerClientEvent('washing:setDirty', src, GetDirty(Player))
end)
