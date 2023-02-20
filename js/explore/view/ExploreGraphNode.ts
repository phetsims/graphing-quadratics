// Copyright 2018-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Graph for the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import merge from '../../../../phet-core/js/merge.js';
import GQConstants from '../../common/GQConstants.js';
import GQGraphNode from '../../common/view/GQGraphNode.js';
import QuadraticNode from '../../common/view/QuadraticNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export default class ExploreGraphNode extends GQGraphNode {

  /**
   * @param {ExploreModel} model
   * @param {ExploreViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( model, viewProperties, options ) {

    options = merge( {
      preventVertexAndEquationOverlap: false // there is no vertex displayed on this screen
    }, options );

    const termNodeOptions = {
      lineWidth: GQConstants.QUADRATIC_TERMS_LINE_WIDTH,
      preventVertexAndEquationOverlap: options.preventVertexAndEquationOverlap
    };

    // quadratic term, y = ax^2
    const quadraticTermNode = new QuadraticNode(
      model.quadraticTermProperty,
      model.graph.xRange,
      model.graph.yRange,
      model.modelViewTransform,
      viewProperties.equationForm,
      viewProperties.equationsVisibleProperty,
      termNodeOptions );
    viewProperties.quadraticTermVisibleProperty.link( visible => { quadraticTermNode.visible = visible; } );

    // linear term, y = bx
    const linearTermNode = new QuadraticNode(
      model.linearTermProperty,
      model.graph.xRange,
      model.graph.yRange,
      model.modelViewTransform,
      viewProperties.equationForm,
      viewProperties.equationsVisibleProperty,
      termNodeOptions );
    viewProperties.linearTermVisibleProperty.link( visible => { linearTermNode.visible = visible; } );

    // constant term, y = bx
    const constantTermNode = new QuadraticNode(
      model.constantTermProperty,
      model.graph.xRange,
      model.graph.yRange,
      model.modelViewTransform,
      viewProperties.equationForm,
      viewProperties.equationsVisibleProperty,
      termNodeOptions );
    viewProperties.constantTermVisibleProperty.link( visible => { constantTermNode.visible = visible; } );

    assert && assert( !options.otherCurves, 'ExploreGraphNode sets otherCurves' );
    options.otherCurves = [ constantTermNode, linearTermNode, quadraticTermNode ]; // rendered in this order

    super( model, viewProperties, options );

    // Make quadratic terms available to the point tool, if they are visible. The order of
    // model.quadraticTermsProperty determines the order that the terms will be considered by
    // point tools, so maintain the order.
    Multilink.multilink( [
      viewProperties.quadraticTermVisibleProperty, model.quadraticTermProperty,
      viewProperties.linearTermVisibleProperty, model.linearTermProperty,
      viewProperties.constantTermVisibleProperty, model.constantTermProperty
    ], (
      quadraticTermVisible, quadraticTerm,
      linearTermVisible, linearTerm,
      constantTermVisible, constantTerm
    ) => {
      // order is important! compact to remove falsy values
      model.quadraticTermsProperty.value = _.compact( [
        quadraticTermVisible && quadraticTerm,
        linearTermVisible && linearTerm,
        constantTermVisible && constantTerm
      ] );
    } );
  }
}

graphingQuadratics.register( 'ExploreGraphNode', ExploreGraphNode );