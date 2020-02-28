// Copyright 2018-2020, University of Colorado Boulder

/**
 * 'Vertex' checkbox.  The vertex icon can be displayed as either a manipulator or a flat circle.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Manipulator from '../../../../graphing-lines/js/common/view/manipulator/Manipulator.js';
import merge from '../../../../phet-core/js/merge.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import graphingQuadraticsStrings from '../../graphing-quadratics-strings.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQColors from '../GQColors.js';
import GQCheckbox from './GQCheckbox.js';

const vertexString = graphingQuadraticsStrings.vertex;

class VertexCheckbox extends GQCheckbox {

  /**
   * @param {BooleanProperty} vertexVisibleProperty
   * @param {Object} [options]
   */
  constructor( vertexVisibleProperty, options ) {

    options = merge( {
      manipulatorIcon: true // true: icon is a shaded manipulator, false: icon is a flat point
    }, options );

    // icon is either a manipulator (3D sphere) or a flat circle
    assert && assert( !options.icon, 'VertexCheckbox sets icon' );
    if ( options.manipulatorIcon ) {
      options.icon = Manipulator.createIcon( 8, GQColors.VERTEX );
    }
    else {
      options.icon = new Circle( 6, { fill: GQColors.VERTEX } );
    }

    // phetioDocumentation that is appropriate for icon type
    if ( options.phetioDocumentation === undefined ) {
      if ( options.manipulatorIcon ) {
        options.phetioDocumentation = 'checkbox that shows the vertex manipulator on the graph';
      }
      else {
        options.phetioDocumentation = 'checkbox that shows the vertex on the graph';
      }
    }

    super( vertexString, vertexVisibleProperty, options );
  }
}

graphingQuadratics.register( 'VertexCheckbox', VertexCheckbox );
export default VertexCheckbox;