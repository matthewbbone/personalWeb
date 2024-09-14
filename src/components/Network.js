// Network.js
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import {abs, pow} from 'mathjs';

export default function Network({className}) {

    const sketchRef = useRef();

    useEffect(() => {
        let p5Instance = new p5(sketch, sketchRef.current);
        return () => {
            // Clean up the p5 instance when the component unmounts
            p5Instance.remove();
        };
    }, []);

    const sketch = (p) => {

        const n_particles = 200;
        const particles = [];

        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight);
            for (let i = 0; i < n_particles; i++) {
                particles.push(new Particle(p));
            }
        };

        p.draw = () => {
            p.background(43,43,43);
            particles.forEach((particle, index) => {
                particle.interaction(particles.slice(index));
                particle.mouse_react(particles.slice(index));
                particle.drawParticle();
            });
        };

        class Particle {

            constructor(p) {
                this.p = p;
                this.pos = p.createVector(
                    p.random(p.width),
                    p.random(p.height)
                );
                this.vel = p.createVector(
                    p.random(-1, 1),
                    p.random(-1, 1)
                );
                this.acc = p.createVector(0, 0)
            }

            interaction(particles) {

                let [neighbors, pos_x, pos_y, dir_x, dir_y] = particles.reduce((acc, particle) => {
                    let distance = this.p.dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
                    const maxDistance = 100;
                    if (distance < maxDistance) {
                        this.p.stroke(255, (1 - (distance / maxDistance)) * 255);
                        this.p.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
                        // repulsion
                        let force = p5.Vector.sub(particle.pos, this.pos);
                        force.setMag(- pow(maxDistance / distance, 2));
                        this.acc = force;
                    }
                
                    let neighbor = 0;
                    let posX = 0;
                    let posY = 0;
                    let dirX = 0;
                    let dirY = 0;
                
                    if (distance < 400) {
                        neighbor = 1
                        posX = particle.pos.x;
                        posY = particle.pos.y;
                        dirX = particle.vel.x;
                        dirY = particle.vel.y;
                    }
                
                    // Push values into respective arrays
                    acc[0].push(neighbor);
                    acc[1].push(posX);
                    acc[2].push(posY);
                    acc[3].push(dirX);
                    acc[4].push(dirY);
                
                    return acc;
                }, [[], [], [], [], []]);  // Initialize arrays to collect neighbors, pos_x, pos_y, acc_x, acc_y

                let n_neighbors = neighbors.reduce((a, b) => a + b, 0);
                let avg_pos_x = pos_x.reduce((a, b) => a + b, 0) / n_neighbors;
                let avg_pos_y = pos_y.reduce((a, b) => a + b, 0) / n_neighbors;
                let avg_dir_x = dir_x.reduce((a, b) => a + b, 0) / n_neighbors;
                let avg_dir_y = dir_y.reduce((a, b) => a + b, 0) / n_neighbors;

                let cohesion = p.createVector(avg_pos_x - this.pos.x, avg_pos_y - this.pos.y);
                let alignment = p.createVector(avg_dir_x, avg_dir_y);

                this.acc.add(cohesion.setMag(1));
                this.acc.add(alignment.setMag(3));
                this.acc.setMag(0.01);
                this.vel.add(this.acc);
                this.vel.limit(2);
                this.pos.add(this.vel);
                this.detectEdges();

            }

            mouse_react(particles) {

                let mouse = p.createVector(p.mouseX, p.mouseY);
                let distance = p.dist(this.pos.x, this.pos.y, mouse.x, mouse.y);

                if (distance < 100) {
                    let force = p5.Vector.sub(mouse, this.pos);
                    force.setMag(-0.1);
                    this.acc = force;
                    this.vel.add(this.acc);
                } else if (abs(this.vel.x) > 1 || abs(this.vel.y) > 1) {
                    this.acc.set(0, 0);
                    this.vel.mult(0.99);
                }

                this.pos.add(this.vel);
                this.detectEdges();
            }

            detectEdges() {
                if (this.pos.x < 0 || this.pos.x > this.p.width) {
                    this.vel.x *= -1;
                }
                if (this.pos.y < 0 || this.pos.y > this.p.height) {
                    this.vel.y *= -1;
                }
            }

            drawParticle() {
                this.p.noStroke();
                this.p.fill(255);
                this.p.ellipse(this.pos.x, this.pos.y, 5);
            }

        }
    };

    return <div ref={sketchRef}  className={className}></div>;
}
