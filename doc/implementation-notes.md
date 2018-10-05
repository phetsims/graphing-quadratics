# Graphing Quadratics - implementation notes

## Memory management 

Because object instances exist for the lifetime of the sim, `unlink`, `removeListener`, `dispose`, etc. are generally not needed.
