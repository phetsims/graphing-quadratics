// Copyright 2025, University of Colorado Boulder

/**
 * PointToolDescriber encapsulates description of the point tool.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingQuadratics from '../../../graphingQuadratics.js';
import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import GraphingQuadraticsStrings from '../../../GraphingQuadraticsStrings.js';
import { toFixedNumber } from '../../../../../dot/js/util/toFixedNumber.js';
import GQConstants from '../../GQConstants.js';
import PointTool from '../../model/PointTool.js';
import GQGraph from '../../model/GQGraph.js';
import Quadratic from '../../model/Quadratic.js';

export default class PointToolDescriber {

  private constructor() {
    // Not intended for instantiation.
  }

  /**
   * Creates the accessible object response that describes what the point tool is currently measuring.
   */
  public static createObjectResponse( pointTool: PointTool,
                                      graph: GQGraph,
                                      getCurveName: ( quadratic: Quadratic ) => string | null ): string {

    let response: string;
    const position = pointTool.positionProperty.value;

    if ( graph.contains( position ) ) {

      // Get the curve that the point tool is currently snapped to.
      const snapQuadratic = pointTool.quadraticProperty.value;

      if ( snapQuadratic ) {

        // Snapped to a curve: "{{x}}, {{y}} on {{curveName}}"
        response = StringUtils.fillIn( GraphingQuadraticsStrings.a11y.pointToolNode.accessibleObjectResponseXYCurveNameStringProperty, {
          x: toFixedNumber( position.x, GQConstants.POINT_TOOL_DECIMALS ),
          y: toFixedNumber( position.y, GQConstants.POINT_TOOL_DECIMALS ),
          curveName: getCurveName( snapQuadratic )
        } );
      }
      else {

        // On the graph, but not snapped to a curve: "{{x}}, {{y}}"
        response = StringUtils.fillIn( GraphingQuadraticsStrings.a11y.pointToolNode.accessibleObjectResponseXYStringProperty.value, {

          // Use the same formatting and number of decimal places as the visual UI.
          x: toFixedNumber( position.x, GQConstants.POINT_TOOL_DECIMALS ),
          y: toFixedNumber( position.y, GQConstants.POINT_TOOL_DECIMALS )
        } );
      }
    }
    else {

      // "off grid"
      response = GraphingQuadraticsStrings.a11y.pointToolNode.accessibleObjectResponseOffGridStringProperty.value;
    }

    return response;
  }
}

graphingQuadratics.register( 'PointToolDescriber', PointToolDescriber );