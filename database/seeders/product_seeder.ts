import Product from '#models/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        title: 'Placa De Vídeo Msi Geforce Rtx 4090',
        description:
          'Marca: MSI\nModelo: 912-V510-262\nInterface: PCI Express Gen 4\nCore Clock: Desempenho Extremo: 2610 MHz (MSI Center) - Boost: 2595 MHz\nCUDA Cores: 16384 Units\nVelocidade de memória: 21 Gbps\nMemória: 24GB GDDR6X\nBarramento de memória: 384 bits\nSuporte HDCP: Sim\nConectores de alimentação: 16 pinos x 1\nFonte de alimentação recomendada: 850 W\nConsumo de energia: 450W\nDimensões: 322 x 136 x 62 mm\nSuporte à versão DirectX: 12 Ultimate\nSuporte à versão OpenGL: 4.6\nTecnologia G-Sync: Sim\nSaída:\n- 2x DisplayPort (v1.4a)\n- 2x HDMI (suporta 4K a 120 Hz HDR e 8K a 60 Hz HDR e taxa de atualização variável (VRR) conforme especificado em HDMI 2.1a)\nResolução máxima digital: 7680 x 4320\n',
        price: 15105.59,
        quantity: 356,
        image: 'testImage1.jpg',
      },
      {
        title: 'Console Sony Playstation 5 Ps5 825gb Mídia Física',
        description:
          'Com seu console PlayStation 5 você terá entretenimento garantido todos os dias. Sua tecnologia foi criada para colocar novos desafios para jogadores novatos e especialistas.\n\nO PlayStation renovou as expectativas do mundo virtual com este novo console e seu grande desempenho. Tem uma interface de usuário mais rápida e fácil de navegar do que os modelos anteriores. Além disso, você poderá jogar por horas desafiando milhões de oponentes em todo o mundo que estão esperando por novos desafios.\n\nQualidade de outro nível\nEste console é considerado o melhor do mercado, já que tem uma resolução de até 4K.\n\nAlém disso, o controle DualSense para PS5 combina estilo e tecnologia para tornar o jogo mais confortável e interativo para todos os seus jogadores.\n\nAdaptado às suas necessidades\nSalve as suas aplicações, fotos, vídeos e muito mais no disco rígido, que tem uma capacidade de 825 GB.\nPor ter um processador de 8 núcleos e um gráfico, fornecem uma experiência dinâmica, respostas ágeis e transições suaves de imagens de alta definição.\nPor outro lado, tem uma porta USB e saída HDMI, que permitem conectar acessórios e carregar a bateria do controle enquanto você joga.\n\nVocê poderá reproduzir música, assistir seus filmes e séries favoritos através dos aplicativos para download.\n\nAviso legal\n• A duração da bateria dos controles depende de como o produto é usado.\n',
        price: 3999.95,
        quantity: 156,
        image: 'testImage2.jpg',
      },
      {
        title: 'Mouse Gamer Razer Deathadder Essential 6400dpi Cor Preto',
        description:
          'O MOUSE ESSENCIAL PARA JOGOS\nA linha Razer DeathAdder é reconhecida pela sua confiabilidade, durabilidade e ergonomia. O Razer DeathAdder Essential eleva essas qualidades, tornando-se uma escolha acessível.\n\nFORMATO ERGONÔMICO\nO design ergonômico do Razer DeathAdder Essential é mantido, assegurando conforto para longas sessões de jogo.\n\n5 Botões De Hiper-Resposta\nBotões Hyperesponse programáveis proporcionam controles avançados.\n\nAté 10 Milhões De Cliques\nOs interruptores mecânicos Razer ™ são duráveis e confiáveis.\n\nSensor óptico de 6.400 DPI\nPermite movimentos rápidos e precisos, oferecendo controle nas partidas.\n\nESPECIFICAÇÕES TÉCNICAS:\nFATOR DE FORMA: Destro\nCONECTIVIDADE: Com fio - cabo padrão\nILUMINAÇÃO: Iluminação verde de uma cor\nSENSOR: Ótico\nSENSIBILIDADE MÁXIMA (DPI): 6400\nVELOCIDADE MÁXIMA (IPS): 220\nACELERAÇÃO MÁXIMA (G): 30\nBOTÕES PROGRAMÁVEIS: 5\nTIPO DE MUDANÇA: Mecânico\nMUDAR O CICLO DE VIDA: 10 milhões de cliques\nPÉS DE RATO: Pés de estoque padrão\nCABO: Comprimento do cabo: 2,1 m / 6,89 pés\nTILT SCROLL WHEEL: Não\nTAMANHOS: Comprimento: 127,0 mm / 5 pol. / Largura do punho: 61,7 mm / 2,43 pol. / Altura: 42,7 mm / 1,68 pol.\nPESO: 96 g\nCOMPATIBILIDADE DE DOCK: Nenhum\n',
        price: 165.99,
        quantity: 78,
        image: 'testImage3.jpg',
      },
      {
        title:
          'Teclado Satechi W3 Slim Retroiluminado Com Fio USB-C USB-C ST-UCSW3M QWERTY Inglês US Cor Cinza Escuro',
        description:
          'Complete o seu espaço de mesa moderno, enquanto trabalha remotamente ou em casa, com o teclado retroiluminado com fio Satechi Slim W3. Projetado para dispositivos Mac, o teclado W3 apresenta um layout estendido com teclado numérico e teclas de atalho convenientes otimizadas para Mac e iOS – tudo com um design moderno e ultrafino. Equipado com teclas retroiluminadas ajustáveis e uma conexão USB-C com fio, o teclado permite que você trabalhe com facilidade onde e quando sua criatividade o levar.\n\nCompatibilidade de dispositivos\n\nMacBook Pro\n\nMacBook Pro M3 (14")\nMacBook Pro M3 Pro (14" e 16")\nMacBook Pro M3 Máx. (14" e 16")\nMacBook Pro (13 polegadas, M2, 2022)\nMacBook Pro (13 polegadas, M1, 2020)\nMacBook Pro (13 polegadas, 2020)\nMacBook Pro (13 polegadas, 2016 - 2019)\nMacBook Pro (14 polegadas, 2023)\nMacBook Pro (14 polegadas, 2021)\nMacBook Pro (16 polegadas, 2023)\nMacBook Pro (16 polegadas, 2021)\nMacBook Pro (16 polegadas, 2019)\nMacBook Pro (15 polegadas, 2016 - 2019)\n\nMacBook Air\n\nMacBook Air (15 polegadas, M2, 2023)\nMacBook Air (13 polegadas, M2, 2022)\nMacBook Air (M1, 2020)\nMacBook Air (Retina, 13 polegadas, 2020)\nMacBook Air (Retina, 13 polegadas, 2018 - 2019)\n\nExibição de estúdio\n\nExibição de estúdio (2022)\n\nTela profissional\n\nTela Pro XDR (2019)\n\niMac\n\niMac M3 (2023)\niMac (24 polegadas, M1, 2021)\niMac (Retina 4K, 21,5 polegadas, 2017)\niMac (Retina 5K, 27 polegadas, 2019–2020)\niMac (Retina 5K, 27 polegadas, 2017)\niMac Pro (2017)\n\nMacMini\n\nMac mini (2023)\nMac mini (M1, 2020)\nMac mini (2018)\n\nEstúdio Mac\n\nEstúdio Mac (2023)\nEstúdio Mac (2022)\n\nMac Pro\n\nMac Pro (2023)\n\niPad Pro\n\niPad Pro de 12,9 polegadas (6ª geração)\niPad Pro de 12,9 polegadas (5ª geração)\niPad Pro de 12,9 polegadas (4ª geração)\niPad Pro de 12,9 polegadas (3ª geração)\niPad Pro de 12,9 polegadas (2ª geração)\niPad Pro de 12,9 polegadas (1ª geração)\niPad Pro de 11 polegadas (4ª geração)\niPad Pro de 11 polegadas (3ª geração)\niPad Pro de 11 polegadas (2ª geração)\niPad Pro de 11 polegadas (1ª geração)\n\niPad Air\n\niPad Air (5ª geração)\niPad Air (4ª geração)\n\niPad\n\niPad (10ª geração)\n\niPad Mini\n\niPad mini (6ª geração)\n\nImportante: não oferece suporte a dispositivos com porta USB-A padrão e precisa de um adaptador para conectividade.\n\nEspecificações técnicas\n\nO que está na caixa\n\nTeclado retroiluminado com fio Slim W3, 2 risers de borracha e manual do usuário\n\nTipo de conector\n\nUSB-C com fio\n\nDimensões e Peso\n\n42,29 x 11,43 x 1 centímetro, 440 gramas\n\nModelo#/UPC\n\nST-UCSW3M/879961009083\n',
        price: 529.99,
        quantity: 25,
        image: 'testImage4.jpg',
      },
    ])
  }
}
