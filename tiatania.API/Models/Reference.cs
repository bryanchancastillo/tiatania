using System;
namespace tiatania.API.Models
{

    /* Need to create a model base that will be implemented by all models
	 * This base will have a nullable IEnumerable<object> of type "Message" (new custom type)
	 * Message type will have a property for field name (string), message (string)
	 */
    public class Reference
    {

        public int? ReferenceId { get; set; }

        public string? Code { get; set; }


    }
}
