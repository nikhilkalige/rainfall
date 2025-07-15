{
  description = "A simple Vite project for visualizing rainfall data from Google Sheets using D3 and Observable Plot.";

  # inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";

  outputs =
    { self, nixpkgs }:
    let
      eachSystem =
        f:
        nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = eachSystem (pkgs: {
        default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs
            yarn
            nodePackages.typescript
          ];
        };
      });
    };
}
