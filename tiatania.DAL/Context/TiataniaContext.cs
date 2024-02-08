using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using tiatania.dal.Models;

namespace tiatania.DAL;

public partial class TiataniaContext : DbContext
{
    public TiataniaContext(DbContextOptions<TiataniaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Menu> Menus { get; set; }

    public virtual DbSet<ReferenceMenuType> ReferenceMenuTypes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Menu>(entity =>
        {
            entity.HasKey(e => e.MenuId).HasName("PRIMARY");

            entity.ToTable("menu");

            entity.HasIndex(e => e.MenuTypeId, "menu_type_id_idx");

            entity.Property(e => e.MenuId).HasColumnName("menu_id");
            entity.Property(e => e.Active).HasColumnName("active");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.CreatedOn)
                .HasColumnType("timestamp")
                .HasColumnName("created_on");
            entity.Property(e => e.ImagePath)
                .HasMaxLength(255)
                .HasColumnName("image_path");
            entity.Property(e => e.MenuTypeId).HasColumnName("menu_type_id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");
            entity.Property(e => e.UpdatedOn)
                .HasColumnType("timestamp")
                .HasColumnName("updated_on");

            entity.HasOne(d => d.MenuType).WithMany(p => p.Menus)
                .HasForeignKey(d => d.MenuTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("menu_type_id");
        });

        modelBuilder.Entity<ReferenceMenuType>(entity =>
        {
            entity.HasKey(e => e.MenuTypeId).HasName("PRIMARY");

            entity.ToTable("reference_menu_type");

            entity.Property(e => e.MenuTypeId).HasColumnName("menu_type_id");
            entity.Property(e => e.Active).HasColumnName("active");
            entity.Property(e => e.Code)
                .HasMaxLength(45)
                .HasColumnName("code");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.CreatedOn)
                .HasColumnType("timestamp")
                .HasColumnName("created_on");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");
            entity.Property(e => e.UpdatedOn)
                .HasColumnType("timestamp")
                .HasColumnName("updated_on");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
