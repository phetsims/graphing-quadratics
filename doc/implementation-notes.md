# Graphing Quadratics - implementation notes

This document contains notes related to the implementation of Graphing Quadratic. This is not an exhaustive description of the implementation.  The intention is to provide a high-level overview, and to supplement the internal documentation (source code comments) and external documentation (design documents).  

The audience for this document is software developers who are familiar with JavaScript and PhET simulation development, as described in [PhET Development Overview](http://bit.ly/phet-html5-development-overview).  The reader should also be familiar with general design patterns used in PhET simulations.

Before reading this document, see [model.md](https://github.com/phetsims/graphing-quadratics/blob/master/doc/model.md), which provides a high-level description of the simulation model.

## Terminology

This section defines terminology that you'll see used throughout the internal and external documentation.  There's no need to memorize this section; skim it once, refer back to it as you explore the implementation.

Standard terminology:

* constant term
* diretrix
* focus
* line
* linear term
* parabola
* quadratic term
* standard form
* vertex
* vertex form

PhET-specific terminology:

alternative vertex form

## Common Patterns

This section describes how this simulation uses patterns that are generally common to PhET simulations.

**Model-view transform**: This simulation has a model-view transform that maps from the graph (model) coordinate frame to the view coordinate frame. 

**Query parameters**: Query parameters are used to enable sim-specific features, mainly for debugging and
testing. Sim-specific query parameters are documented in
[GQQueryParameters](https://github.com/phetsims/graphing-quadratics/blob/master/js/common/GQQueryParameters.js).

**Assertions**: The implementation makes heavy use of `assert` to verify pre/post assumptions and perform type checking. If you are making modifications to this sim, do so with assertions enabled via the `ea` query parameter.

**Memory management**: Unless otherwise documented in the source code, assume that `unlink`, `removeListener`, `dispose`, etc. are generally not needed. Most object instances exist for the lifetime of the sim, and there are no dynamic objects that participate in observer-observable relationships.

## Model

This section provides an overview of the most important model elements, and some miscellaneous topics
related to the model.

TODO

## View

This section provides an overview of the most important view components, and some miscellaneous topics
related to the view.

TODO

## Related simulations

This sim borrows a small number of model and view components from Graphing Lines. 
