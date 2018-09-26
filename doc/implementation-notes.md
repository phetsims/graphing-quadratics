# Function Builder - implementation notes

## Memory management 

Unless otherwise noted, unlink/removeListener/dispose/etc. is not needed because object
instances exist for the lifetime of the sim.  The sole exception is erasing quadratics; in GQGraphNode, an itemRemovedListener must be removed when a quadratic is erased.
