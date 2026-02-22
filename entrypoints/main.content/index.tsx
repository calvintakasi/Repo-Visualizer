import './style.css';
import ReactDOM from 'react-dom/client';
import { SummaryCard } from '../../components/SummaryCard';

export default defineContentScript({
  matches: ['*://github.com/*/*'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'repo-visualizer',
      position: 'inline',
      anchor: '.repository-content',
      append: 'before',
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);
        root.render(<SummaryCard />);
        return root;
      },
      onRemove: (root) => root?.unmount(),
    });
    ui.mount();
  },
});