using System.ComponentModel.DataAnnotations;

namespace RBAC.Api.Domain.Entities;

public class AccessDetails
{
    public int Id { get; set; }
    [Required]
    public string FolderNamePath { get; set; } = null!;
    [Required]
    public string TypeOfAccess { get; set; } = null!;
    public string ReasonForAccess { get; set; } = null!;
    public DateTime CreatedOn { get; set; }
    public DateTime? ModifiedOn { get; set; }
    public string CreatedBy { get; set; } = null!;
    public string? ModifiedBy { get; set; }
    public DateTime? ExpiredAt { get; set; }
    public ICollection<AccessRequest> AccessRequests { get; set; } = new List<AccessRequest>();
}
