# Lavagem de Dinheiro

![Lavagem de Dinheiro](https://i.imgur.com/OzKuCp8.png)

Este recurso para **FiveM** implementa um sistema de **lavagem de dinheiro** para servidores QBCore. O jogador chega até um local, informa quanto quer lavar das suas **notas marcadas**, aguarda um tempo de processamento e recebe o valor em **dinheiro limpo**, descontada a taxa de serviço. A estrutura do projeto é organizada em três partes principais: `server`, `client` e `ui`, cada uma responsável por uma camada da aplicação.

[Vídeo de demonstração](https://medal.tv/games/gta-v/clips/n3UvohnyaFeCRWLIj?invite=cr-MSxpSVosNTMxMzE3MzA5&v=98)

## Fluxo

1. Chegue perto de um local de lavagem e aperte **E**
2. A UI abre e mostra quanto de dinheiro sujo você possui (validado no server)
3. Digite o valor que deseja lavar (ou use o botão **MAX**)
4. Aperte **Lavar Dinheiro** → aguarde o timer
5. Aperte **Receber Dinheiro**
6. O server remove as notas marcadas e paga o valor limpo (menos a taxa)

## Dependências

- `qb-core`
- `qb-inventory` (item `markedbills`)

## Instalação

1. Coloque a pasta em `resources/[cfx-default]/[local]/`
2. Se alterar a UI, rebuild:
   ```bash
   cd ui && npm install && npm run build
   ```

## Item necessário

A lavagem usa o item `markedbills`, que já vem por padrão no QBCore (`qb-core/shared/items.lua`). O valor de cada nota é lido do `info.worth`.

## Configuração

Tudo em [`shared/config.lua`](shared/config.lua):

| Opção              | Descrição                         |
| ------------------ | --------------------------------- |
| `Config.Fee`       | Taxa de serviço cobrada (%)       |
| `Config.Locations` | Coordenadas dos locais de lavagem |

## Estrutura

```
lavagem-dinheiro-fivem/
├── shared/config.lua    # configurações
├── client/main.lua      # interação, tecla E, UI
├── server/main.lua      # validação, remoção do item, pagamento
└── ui/                  # interface (React + Tailwind)
```

Feito por **Ster Roque**.
