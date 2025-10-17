export const theme = {
  colors: {
    // Cores base do tema Escuro/Retrô
    background: '#080808', // Fundo Principal Escuro (Tela desligada)
    screen: '#f0f8f8', // Cor de fundo de menus/telas claras (simulando papel/menu claro)
    
    // Cores de Destaque
    primary: '#104080', // Azul forte (para títulos/elementos de destaque - Botões/Bordas)
    secondary: '#808080', // Cinza médio (Ícones e elementos neutros)
    accent: '#CC0000', // Vermelho Principal (Pode ser usado para o Tipo Fogo ou outros destaques)
    
    // Cores de Texto e Componentes
    text: '#EEEEEE', // CORRIGIDO: Texto Claro (Alto contraste com o background escuro)
    textSecondary: '#AAAAAA', // NOVO: Texto Secundário (Para hints ou infos menos importantes)
    card: '#1A1A1A', // Fundo de Card Escuro (Contraste suave com o background)

    // Cores de Status e Feedback (NOVO)
    error: '#FF4444', // Vermelho Brilhante (Texto/Borda de Erro)
    errorBackground: '#440000', // Fundo Escuro de Caixas de Erro (Para caixas de erro menos agressivas)
    success: '#4CAF50', // Verde (Mensagens de Sucesso)
    
    // Cores de Tipos Comuns (para referência futura)
    typeWater: '#6890F0',
    typeGrass: '#78C850',
    typeFire: '#F08030',
  },
  fonts: {
    regular: 'System', 
    bold: 'System', 
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
  },
  borderRadius: {
    s: 4, 
    m: 8,
    l: 12,
  },
};