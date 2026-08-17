// Split point for Motion's feature set. LazyMotion takes an async loader, so
// keeping the import in its own module lets Rollup put these features in a
// separate chunk instead of the entry bundle — the page paints, then the
// animation features arrive. Anything imported here is off the critical path,
// so import domMax rather than domAnimation and keep the drag-dismissable
// comments sheet working.
export { domMax as default } from 'motion/react'
