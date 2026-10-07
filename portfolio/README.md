# Portfolio — Alegre Sithole

Site pessoal de programador júnior. HTML, CSS e JavaScript puros, **sem
frameworks e sem dependências**. Abre com um duplo clique no `index.html`.

## O que tem

- Tema claro/escuro automático, com botão para trocar manualmente
  (guardado em `localStorage`)
- Menu responsivo que fecha com `Esc`
- Respeita `prefers-color-scheme` e `prefers-reduced-motion`
- Navegação por âncora com `scroll-padding-top`
- Link de salto (*skip link*) para acessibilidade
- Estilos de impressão

## Estrutura

```
index.html      estrutura e conteúdo
css/styles.css  estilos, variáveis e temas
js/main.js      tema, menu, ano, sombra do cabeçalho
```

## Tecnologias

- HTML semântico
- CSS: variáveis customizadas, Flexbox, Grid, `clamp()`, `color-mix()`
- JavaScript: DOM, eventos, `localStorage`, IIFE, sem `var` global
- Zero dependências, zero passo de build

## Correr localmente

Não precisa de nada instalado:

```bash
# abrir directamente
xdg-open index.html

# ou servir (recomendado, para testar tudo)
python3 -m http.server 8000
```

Depois abrir `http://localhost:8000`.

## Publicar

Qualquer hosting estático serve. As opções mais simples:

- **GitHub Pages** — activar nas Settings do repositório
- **Netlify Drop** — arrastar a pasta para netlify.com/drop

## Licença

MIT. Ver [LICENSE](LICENSE).