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
        image: '',
      },
      {
        title: 'Console Sony Playstation 5 Ps5 825gb Mídia Física',
        description:
          'Com seu console PlayStation 5 você terá entretenimento garantido todos os dias. Sua tecnologia foi criada para colocar novos desafios para jogadores novatos e especialistas.\n\nO PlayStation renovou as expectativas do mundo virtual com este novo console e seu grande desempenho. Tem uma interface de usuário mais rápida e fácil de navegar do que os modelos anteriores. Além disso, você poderá jogar por horas desafiando milhões de oponentes em todo o mundo que estão esperando por novos desafios.\n\nQualidade de outro nível\nEste console é considerado o melhor do mercado, já que tem uma resolução de até 4K.\n\nAlém disso, o controle DualSense para PS5 combina estilo e tecnologia para tornar o jogo mais confortável e interativo para todos os seus jogadores.\n\nAdaptado às suas necessidades\nSalve as suas aplicações, fotos, vídeos e muito mais no disco rígido, que tem uma capacidade de 825 GB.\nPor ter um processador de 8 núcleos e um gráfico, fornecem uma experiência dinâmica, respostas ágeis e transições suaves de imagens de alta definição.\nPor outro lado, tem uma porta USB e saída HDMI, que permitem conectar acessórios e carregar a bateria do controle enquanto você joga.\n\nVocê poderá reproduzir música, assistir seus filmes e séries favoritos através dos aplicativos para download.\n\nAviso legal\n• A duração da bateria dos controles depende de como o produto é usado.\n',
        price: 3999.95,
        quantity: 156,
        image: '',
      },
    ])
  }
}
