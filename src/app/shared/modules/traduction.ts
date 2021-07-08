import { MatPaginatorIntl } from '@angular/material/paginator';

const etiquetaRango = (pagina: number, tamanioPagina: number, tamanio: number) => {
  if (tamanio === 0 || tamanioPagina === 0) {
    return `0 de ${tamanio}`;
  }
  tamanio = Math.max(tamanio, 0);
  const indiceInicial = pagina * tamanioPagina;
  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const indiceFinal =
    indiceInicial < tamanio
      ? Math.min(indiceInicial + tamanioPagina, tamanio)
      : indiceInicial + tamanioPagina;
  return `${indiceInicial + 1} - ${indiceFinal} de ${tamanio}`;
};

export const traduccionAEspaniolPaginatorIntl = () => {
  const paginadorIntl = new MatPaginatorIntl();
  paginadorIntl.itemsPerPageLabel = 'Elemetos por página:';
  paginadorIntl.nextPageLabel = 'Página siguiente';
  paginadorIntl.previousPageLabel = 'Página anterior';
  paginadorIntl.getRangeLabel = etiquetaRango;
  paginadorIntl.firstPageLabel = 'Primera página';
  paginadorIntl.lastPageLabel = 'Última página';
  return paginadorIntl;
};
