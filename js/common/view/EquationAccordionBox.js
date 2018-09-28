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
  const SaveEraseButtons = require( 'GRAPHING_QUADRATICS/common/view/SaveEraseButtons' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class EquationAccordionBox extends AccordionBox {

    /**
     * @param {ExploreModel} model
     * @param {BooleanProperty} expandedProperty
     * @param {Node} titleNode
     * @param {Node} interactiveEquationNode
     * @param {Object} [options]
     * @abstract
     */
    constructor( model, expandedProperty, titleNode, interactiveEquationNode, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, GQConstants.ACCORDION_BOX_OPTIONS, options );

      assert && assert( !options.expandedProperty, 'EquationAccordionBox sets expandedProperty' );
      options.expandedProperty = expandedProperty;

      assert && assert( !options.titleNode, 'EquationAccordionBox sets titleNode' );
      options.titleNode = titleNode;

      const saveEraseButtons = new SaveEraseButtons( 
        model.saveQuadratic.bind( model ), 
        model.eraseQuadratics.bind( model ), 
        model.savedQuadratics.lengthProperty, {
          tandem: options.tandem.createTandem( 'saveEraseButtons' ),
          phetioInstanceDocumentation: 'buttons to save and erase a quadratic on the graph'
        } );

      const separatorWidth = Math.max( interactiveEquationNode.width, saveEraseButtons.width );

      const separatorOptions = { stroke: GQColors.SEPARATOR };

      const content = new VBox( {
        align: 'center',
        spacing: 10,
        children: [
          new HSeparator( separatorWidth, separatorOptions ),
          interactiveEquationNode,
          new HSeparator( separatorWidth, separatorOptions ),
          saveEraseButtons
        ]
      } );

      super( content, options );
    }
  }

  return graphingQuadratics.register( 'EquationAccordionBox', EquationAccordionBox );
} );