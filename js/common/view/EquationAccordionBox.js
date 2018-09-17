// Copyright 2018, University of Colorado Boulder

/**
 * Abstract base type for accordion box that displays the interactive equation and related controls.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HSeparator = require( 'SUN/HSeparator' );
  const SaveCurveControls =  require( 'GRAPHING_QUADRATICS/common/view/SaveCurveControls' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class EquationAccordionBox extends AccordionBox {

    /**
     * @param {ExploreModel} model
     * @param {GQViewProperties} viewProperties
     * @param {Node} titleNode
     * @param {Node} interactiveEquationNode
     * @param {Object} [options]
     * @abstract
     */
    constructor( model, viewProperties, titleNode, interactiveEquationNode, options ) {

      options = _.extend( {
        expandedProperty: viewProperties.equationAccordionBoxExpandedProperty
      }, GQConstants.ACCORDION_BOX_OPTIONS, options );

      assert && assert( !options.titleNode, 'EquationAccordionBox sets titleNode' );
      options.titleNode = titleNode;

      const saveCurveControls = new SaveCurveControls(
        model.saveQuadratic.bind( model ), model.eraseQuadratics.bind( model ),
        viewProperties.curvesVisibleProperty, model.savedQuadratics.lengthProperty );

      const separatorWidth = Math.max( interactiveEquationNode.width, saveCurveControls.width );

      const separatorOptions = { stroke: GQColors.SEPARATOR };

      const content = new VBox( {
        align: 'center',
        spacing: 10,
        children: [
          new HSeparator( separatorWidth, separatorOptions ),
          interactiveEquationNode,
          new HSeparator( separatorWidth, separatorOptions ),
          saveCurveControls
        ]
      } );

      super( content, options );
    }
  }

  return graphingQuadratics.register( 'EquationAccordionBox', EquationAccordionBox );
} );