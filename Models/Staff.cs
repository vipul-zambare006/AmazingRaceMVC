using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    [Table("Staff")]
    public class Staff
    {
        public Guid ID { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Staff Name is required")]
        public string Name { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Staff Location is required")]
        public string Location { get; set; }

    }
}
