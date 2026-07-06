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

RegisterNetEvent('washing:wash', function(amount)
  local src = source
  local Player = QBCore.Functions.GetPlayer(src)
  if not Player then return end

  amount = tonumber(amount)

  if not amount or amount <= 0 then
    return TriggerClientEvent('washing:result', src, false, 'valor invalido')
  end

  local dirty = GetDirty(Player)

  if amount > dirty then
    return TriggerClientEvent('washing:result', src, false, 'voce nao tem esse valor em dinheiro sujo')
  end

  local markedItem = QBCore.Shared.Items['markedbills']
  local collected = 0
  local removedCount = 0

  for slot, item in pairs(Player.PlayerData.items or {}) do
    if collected >= amount then break end

    if item and item.name == 'markedbills' then
      local worth = (item.info and item.info.worth) or 0

      if worth > 0 then
        local needed = math.ceil((amount - collected) / worth)
        local toRemove = math.min(item.amount, needed)

        Player.Functions.RemoveItem('markedbills', toRemove, slot)
        collected = collected + (toRemove * worth)
        removedCount = removedCount + toRemove
      end
    end
  end

  if removedCount > 0 then
    TriggerClientEvent('qb-inventory:client:ItemBox', src, markedItem, 'remove', removedCount)
  end

  local change = collected - amount
  if change > 0 then
    Player.Functions.AddItem('markedbills', 1, false, { worth = change })
    TriggerClientEvent('qb-inventory:client:ItemBox', src, markedItem, 'add', 1)
  end

  local clean = math.floor(amount * (1 - Config.Fee / 100))

  Player.Functions.AddMoney('cash', clean, 'lavagem')

  TriggerClientEvent('washing:result', src,
    true, ('Você lavou R$ %s e recebeu R$ %s'):format(amount, clean), clean)
end)
